from fastapi import APIRouter, UploadFile, File
from utils.audio_features import extract_mfcc
import joblib
import tempfile
import os

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'best_model.pkl')
model = None

def get_model():
    global model
    if model is None:
        model = joblib.load(MODEL_PATH)
    return model

@router.post('/queen-detect')
async def queen_detect(file: UploadFile = File(...)):
    # Save uploaded file to a temp location
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    try:
        features = extract_mfcc(tmp_path).reshape(1, -1)
        model = get_model()
        pred = model.predict(features)[0]
        proba = model.predict_proba(features)[0][1]
        result = {
            'queen_present': bool(pred),
            'confidence': float(proba) if pred == 1 else float(1 - proba)
        }
    except Exception as e:
        result = {'error': str(e)}
    finally:
        os.remove(tmp_path)
    return result
