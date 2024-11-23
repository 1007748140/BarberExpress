// lib/config/upload_config.dart
class UploadConfig {
  static const int maxImageSizeBytes = 5 * 1024 * 1024; // 5MB
  static const int maxImageWidth = 1000;
  static const int maxImageHeight = 1000;
  static const int imageQuality = 70;
  
  static const Map<String, String> allowedMimeTypes = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
  };

  static bool isValidImageSize(int size) {
    return size <= maxImageSizeBytes;
  }

  static bool isValidMimeType(String mimeType) {
    return allowedMimeTypes.containsKey(mimeType);
  }
}