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
    """Download both the human profile photos and landscape pictures datasets"""
    datasets = [
        "osmankagankurnaz/human-profile-photos-dataset",
        "arnaud58/landscape-pictures"
    ]
    
    success_count = 0
    
    for dataset_path in datasets:
        try:
            print(f"📥 Downloading dataset: {dataset_path}")
            
            # Download the dataset
            kaggle.api.dataset_download_files(
                dataset_path,
                path="./data",
                unzip=True,
                quiet=False
            )
            
            print(f"✅ Dataset {dataset_path} downloaded successfully!")
            success_count += 1
            
        except Exception as e:
            print(f"❌ Error downloading dataset {dataset_path}: {e}")
    
    if success_count == len(datasets):
        print("🎉 All datasets downloaded successfully!")
        return True
    elif success_count > 0:
        print(f"⚠️  {success_count}/{len(datasets)} datasets downloaded successfully")
        return True
    else:
        print("❌ No datasets were downloaded successfully")
        return False

def organize_dataset():
    """Organize the downloaded datasets into a proper structure"""
    data_dir = Path("./data")
    
    if not data_dir.exists():
        print("❌ Data directory not found. Please download the datasets first.")
        return False
    
    # Create organized structure
    organized_dir = Path("./public/dataset")
    organized_dir.mkdir(parents=True, exist_ok=True)
    
    # Organize human profile photos
    profile_photos_dir = data_dir / "human-profile-photos-dataset"
    if profile_photos_dir.exists():
        print("📁 Organizing human profile photos...")
        for img_file in profile_photos_dir.rglob("*.jpg"):
            rel_path = img_file.relative_to(profile_photos_dir)
            target_path = organized_dir / "profiles" / rel_path
            target_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(img_file, target_path)
    
    # Organize landscape pictures
    landscape_dir = data_dir / "landscape-pictures"
    if landscape_dir.exists():
        print("📁 Organizing landscape pictures...")
        for img_file in landscape_dir.rglob("*.jpg"):
            rel_path = img_file.relative_to(landscape_dir)
            target_path = organized_dir / "landscapes" / rel_path
            target_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(img_file, target_path)
    
    print(f"✅ Datasets organized in: {organized_dir}")
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
