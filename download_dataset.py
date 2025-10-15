#!/usr/bin/env python3
"""
Script to download the human profile photos dataset from Kaggle
Dataset: osmankagankurnaz/human-profile-photos-dataset
"""

import os
import kaggle
import zipfile
import shutil
from pathlib import Path

def setup_kaggle_auth():
    """Setup Kaggle authentication"""
    kaggle_dir = Path.home() / '.kaggle'
    kaggle_dir.mkdir(exist_ok=True)
    
    api_file = kaggle_dir / 'kaggle.json'
    
    if not api_file.exists():
        print("⚠️  Kaggle API key not found!")
        print("Please follow these steps:")
        print("1. Go to https://www.kaggle.com/account")
        print("2. Scroll down to 'API' section")
        print("3. Click 'Create New API Token'")
        print("4. Download the kaggle.json file")
        print(f"5. Place it in: {api_file}")
        print("\nAlternatively, you can set environment variables:")
        print("export KAGGLE_USERNAME=your_username")
        print("export KAGGLE_KEY=your_api_key")
        return False
    
    return True

def download_dataset():
    """Download the human profile photos dataset"""
    try:
        # Set the dataset path
        dataset_path = "osmankagankurnaz/human-profile-photos-dataset"
        
        print(f"📥 Downloading dataset: {dataset_path}")
        
        # Download the dataset
        kaggle.api.dataset_download_files(
            dataset_path,
            path="./data",
            unzip=True,
            quiet=False
        )
        
        print("✅ Dataset downloaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error downloading dataset: {e}")
        return False

def organize_dataset():
    """Organize the downloaded dataset into a proper structure"""
    data_dir = Path("./data")
    
    if not data_dir.exists():
        print("❌ Data directory not found. Please download the dataset first.")
        return False
    
    # Create organized structure
    organized_dir = Path("./public/dataset")
    organized_dir.mkdir(parents=True, exist_ok=True)
    
    # Move images to organized structure
    for img_file in data_dir.rglob("*.jpg"):
        # Create subdirectory based on original structure
        rel_path = img_file.relative_to(data_dir)
        target_path = organized_dir / rel_path
        target_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Copy file
        shutil.copy2(img_file, target_path)
    
    print(f"✅ Dataset organized in: {organized_dir}")
    return True

def main():
    """Main function to download and organize the dataset"""
    print("🚀 Starting dataset download process...")
    
    # Setup authentication
    if not setup_kaggle_auth():
        return
    
    # Download dataset
    if not download_dataset():
        return
    
    # Organize dataset
    if not organize_dataset():
        return
    
    print("🎉 Dataset setup complete!")
    print("📁 Dataset location: ./public/dataset/")
    print("🔗 You can now use the profile photos in your application")

if __name__ == "__main__":
    main()
