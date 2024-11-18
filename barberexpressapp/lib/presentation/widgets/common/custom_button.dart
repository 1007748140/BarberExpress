// lib/presentation/widgets/common/custom_button.dart
import 'package:flutter/material.dart';
import '../../../config/app_theme.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;  // Hacemos que onPressed sea opcional
  final bool isLoading;
  final bool isOutlined;

  const CustomButton({
    Key? key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.isOutlined = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDisabled = onPressed == null;

    return Container(
      width: double.infinity,
      height: 55,
      decoration: BoxDecoration(
        gradient: isOutlined || isDisabled ? null : AppTheme.primaryGradient,
        borderRadius: BorderRadius.circular(10),
        border: isOutlined
            ? Border.all(
                color: isDisabled 
                    ? AppTheme.accentColor.withOpacity(0.3) 
                    : AppTheme.secondaryColor,
                width: 2,
              )
            : null,
      ),
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          foregroundColor: isDisabled 
              ? AppTheme.accentColor.withOpacity(0.5) 
              : isOutlined 
                  ? AppTheme.secondaryColor 
                  : Colors.white,
        ),
        child: isLoading
            ? SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(
                    isOutlined ? AppTheme.secondaryColor : Colors.white,
                  ),
                  strokeWidth: 2,
                ),
              )
            : Text(
                text,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
      ),
    );
  }
}