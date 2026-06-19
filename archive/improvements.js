// ═══════════════════════════════════════════════════════════════
// ERROR HANDLING & VALIDATION IMPROVEMENTS
// ═══════════════════════════════════════════════════════════════

/**
 * Enhanced Error Handler with User Feedback
 */
function handleError(error, context = '') {
  const timestamp = new Date().toLocaleString('ar-LY');
  const errorMessage = error?.message || String(error);
  
  console.error(`[${timestamp}] Error in ${context}:`, error);
  
  // Log to system
  if (typeof logAction === 'function') {
    logAction(`خطأ في ${context}: ${errorMessage}`, 'error');
  }
  
  // Show user-friendly notification
  showToast(`حدث خطأ: ${errorMessage}`, 'error');
  
  // Return safe default
  return null;
}

/**
 * Safe Element Getter
 */
function getElement(id, defaultValue = null) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID "${id}" not found`);
      return defaultValue;
    }
    return element;
  } catch (e) {
    handleError(e, `getElement(${id})`);
    return defaultValue;
  }
}

/**
 * Safe Value Setter with Validation
 */
function setElementValue(id, value, defaultValue = '') {
  try {
    const element = getElement(id);
    if (!element) return false;
    
    if (element.type === 'number') {
      element.value = parseFloat(value) || defaultValue;
    } else if (element.type === 'checkbox' || element.type === 'radio') {
      element.checked = Boolean(value);
    } else {
      element.value = String(value || defaultValue);
    }
    return true;
  } catch (e) {
    handleError(e, `setElementValue(${id})`);
    return false;
  }
}

/**
 * Safe Value Getter with Type Conversion
 */
function getElementValue(id, type = 'string', defaultValue = null) {
  try {
    const element = getElement(id);
    if (!element) return defaultValue;
    
    const rawValue = element.type === 'checkbox' ? element.checked : element.value;
    
    switch(type) {
      case 'number':
        const num = parseFloat(rawValue);
        return isNaN(num) ? defaultValue : num;
      case 'int':
        const int = parseInt(rawValue);
        return isNaN(int) ? defaultValue : int;
      case 'boolean':
        return Boolean(rawValue);
      case 'string':
      default:
        return String(rawValue || defaultValue);
    }
  } catch (e) {
    handleError(e, `getElementValue(${id})`);
    return defaultValue;
  }
}

/**
 * Validation Functions
 */
const Validators = {
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  phone: (val) => /^[\d\s\-\+\(\)]+$/.test(val),
  currency: (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
  positiveInt: (val) => Number.isInteger(parseInt(val)) && parseInt(val) > 0,
  notEmpty: (val) => val && String(val).trim().length > 0,
  minLength: (min) => (val) => String(val).length >= min,
  maxLength: (max) => (val) => String(val).length <= max,
  date: (val) => !isNaN(new Date(val).getTime()),
  arabicText: (val) => /[\u0600-\u06FF]/.test(val),
};

/**
 * Form Validation Helper
 */
function validateForm(fields) {
  const errors = {};
  
  for (const [fieldId, rules] of Object.entries(fields)) {
    const value = getElementValue(fieldId);
    const element = getElement(fieldId);
    
    for (const rule of rules) {
      let isValid = true;
      let errorMsg = '';
      
      if (typeof rule === 'function') {
        isValid = rule(value);
        errorMsg = 'التحقق من الصحة فشل';
      } else if (rule.validator instanceof Function) {
        isValid = rule.validator(value);
        errorMsg = rule.message || 'التحقق من الصحة فشل';
      }
      
      if (!isValid) {
        errors[fieldId] = errorMsg;
        if (element) {
          element.style.borderColor = 'var(--red)';
          element.title = errorMsg;
        }
        break; // Stop checking other rules for this field
      } else if (element) {
        element.style.borderColor = '';
        element.title = '';
      }
    }
  }
  
  return Object.keys(errors).length === 0 ? { valid: true } : { valid: false, errors };
}

/**
 * Number Formatting Helper
 */
function formatCurrency(value, decimals = 3) {
  try {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.000';
    return num.toFixed(decimals);
  } catch (e) {
    console.error('formatCurrency error:', e);
    return '0.000';
  }
}

/**
 * Date Formatting Helper
 */
function formatDate(date, locale = 'ar-LY') {
  try {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date)) {
      return new Date().toLocaleDateString(locale);
    }
    return date.toLocaleDateString(locale);
  } catch (e) {
    console.error('formatDate error:', e);
    return new Date().toLocaleDateString(locale);
  }
}

/**
 * Safe Array Operations
 */
const SafeArray = {
  find: (arr, predicate, defaultValue = null) => {
    try {
      if (!Array.isArray(arr)) return defaultValue;
      return arr.find(predicate) || defaultValue;
    } catch (e) {
      handleError(e, 'SafeArray.find');
      return defaultValue;
    }
  },
  
  filter: (arr, predicate, defaultValue = []) => {
    try {
      if (!Array.isArray(arr)) return defaultValue;
      return arr.filter(predicate);
    } catch (e) {
      handleError(e, 'SafeArray.filter');
      return defaultValue;
    }
  },
  
  map: (arr, mapper, defaultValue = []) => {
    try {
      if (!Array.isArray(arr)) return defaultValue;
      return arr.map(mapper);
    } catch (e) {
      handleError(e, 'SafeArray.map');
      return defaultValue;
    }
  },
  
  sum: (arr, selector, defaultValue = 0) => {
    try {
      if (!Array.isArray(arr)) return defaultValue;
      return arr.reduce((sum, item) => {
        const value = selector ? selector(item) : item;
        const num = parseFloat(value);
        return sum + (isNaN(num) ? 0 : num);
      }, 0);
    } catch (e) {
      handleError(e, 'SafeArray.sum');
      return defaultValue;
    }
  },
};

/**
 * Safe Object Operations
 */
const SafeObject = {
  get: (obj, path, defaultValue = null) => {
    try {
      const value = path.split('.').reduce((current, prop) => current?.[prop], obj);
      return value !== undefined ? value : defaultValue;
    } catch (e) {
      handleError(e, `SafeObject.get(${path})`);
      return defaultValue;
    }
  },
  
  set: (obj, path, value) => {
    try {
      const keys = path.split('.');
      let current = obj;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return true;
    } catch (e) {
      handleError(e, `SafeObject.set(${path})`);
      return false;
    }
  },
};

/**
 * Performance Monitor
 */
const PerformanceMonitor = {
  timings: {},
  
  start: (label) => {
    PerformanceMonitor.timings[label] = performance.now();
  },
  
  end: (label, logResult = true) => {
    if (!PerformanceMonitor.timings[label]) {
      console.warn(`Timer "${label}" not started`);
      return 0;
    }
    
    const duration = performance.now() - PerformanceMonitor.timings[label];
    delete PerformanceMonitor.timings[label];
    
    if (logResult && duration > 100) {
      console.warn(`⚠️ Slow operation "${label}": ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  },
};

/**
 * Debounce Helper for Input Events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Export Helper Functions
 */
console.log('✅ Error Handling & Validation Module Loaded');
