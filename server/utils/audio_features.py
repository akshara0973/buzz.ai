import numpy as np
import librosa

def extract_mfcc(file_path, sr=22050, n_mfcc=40):
    y, sr = librosa.load(file_path, sr=sr)  # Load the audio file
    y, _ = librosa.effects.trim(y)  # Remove silent parts
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)  # Extract MFCCs
    return np.mean(mfcc.T, axis=0)  # Average across time axis
