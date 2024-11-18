// lib/presentation/widgets/common/custom_dropdown.dart
import 'package:flutter/material.dart';
import '../../../config/app_theme.dart';

class CustomDropdown<T> extends StatelessWidget {
  final T? value;
  final String hint;
  final List<DropdownMenuItem<T>> items;
  final ValueChanged<T?>? onChanged;
  final bool enabled;

  const CustomDropdown({
    Key? key,
    required this.value,
    required this.hint,
    required this.items,
    required this.onChanged,
    this.enabled = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: enabled ? Colors.white : Colors.grey[100],
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: enabled
              ? AppTheme.accentColor.withOpacity(0.3)
              : Colors.grey[300]!,
        ),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<T>(
          value: value,
          hint: Text(
            hint,
            style: TextStyle(
              color: AppTheme.accentColor.withOpacity(0.5),
            ),
          ),
          items: items,
          onChanged: enabled ? onChanged : null,
          isExpanded: true,
          icon: Icon(
            Icons.arrow_drop_down,
            color: enabled ? AppTheme.secondaryColor : Colors.grey,
          ),
          dropdownColor: Colors.white,
          style: TextStyle(
            color: AppTheme.primaryColor,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}