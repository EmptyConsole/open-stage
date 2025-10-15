#!/usr/bin/env python3
"""
Setup script for Kaggle authentication
"""

import os
from pathlib import Path

def setup_instructions():
    """Print setup instructions for Kaggle API"""
    print("🔐 Kaggle API Setup Instructions")
    print("=" * 50)
    print()
    print("To download the dataset, you need to set up Kaggle API authentication:")
    print()
    print("Option 1: Using kaggle.json file")
    print("1. Go to https://www.kaggle.com/account")
    print("2. Scroll down to 'API' section")
    print("3. Click 'Create New API Token'")
    print("4. Download the kaggle.json file")
    print("5. Place it in ~/.kaggle/kaggle.json")
    print()
    print("Option 2: Using environment variables")
    print("1. Get your username and API key from Kaggle")
    print("2. Set environment variables:")
    print("   export KAGGLE_USERNAME=your_username")
    print("   export KAGGLE_KEY=your_api_key")
    print()
    print("Option 3: Manual download")
    print("1. Go to https://www.kaggle.com/datasets/osmankagankurnaz/human-profile-photos-dataset")
    print("2. Click 'Download' button")
    print("3. Extract the zip file to ./data/ directory")
    print()
    print("After setting up authentication, run:")
    print("python3 download_dataset.py")

if __name__ == "__main__":
    setup_instructions()
