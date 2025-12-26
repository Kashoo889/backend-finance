import { body, validationResult } from 'express-validator';

/**
 * Middleware to check validation results
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation rules for Saudi Entry
 */
export const validateSaudiEntry = [
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('refNo')
    .trim()
    .notEmpty()
    .withMessage('Reference number is required')
    .isUppercase()
    .withMessage('Reference number should be uppercase'),
  body('pkrAmount')
    .isFloat({ min: 0 })
    .withMessage('PKR amount must be a positive number'),
  body('riyalRate')
    .isFloat({ min: 0.01 })
    .withMessage('Riyal rate must be greater than zero'),
  body('submittedSar')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Submitted SAR must be a positive number'),
  body('reference2').optional().trim(),
  validate,
];

/**
 * Validation rules for Special Entry
 */
export const validateSpecialEntry = [
  body('userName').trim().notEmpty().withMessage('User name is required'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('balanceType')
    .isIn(['Online', 'Cash'])
    .withMessage('Balance type must be either Online or Cash'),
  body('nameRupees')
    .isFloat({ min: 0 })
    .withMessage('Name rupees must be a positive number'),
  body('submittedRupees')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Submitted rupees must be a positive number'),
  validate,
];

/**
 * Validation rules for Trader
 */
export const validateTrader = [
  body('name').trim().notEmpty().withMessage('Trader name is required'),
  body('shortName')
    .trim()
    .notEmpty()
    .withMessage('Short name is required')
    .isLength({ max: 10 })
    .withMessage('Short name cannot exceed 10 characters')
    .isUppercase()
    .withMessage('Short name should be uppercase'),
  body('color').optional().trim(),
  validate,
];

/**
 * Validation rules for Bank
 */
export const validateBank = [
  body('name').trim().notEmpty().withMessage('Bank name is required'),
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Bank code is required')
    .isUppercase()
    .withMessage('Bank code should be uppercase'),
  validate,
];

/**
 * Validation rules for Bank Ledger Entry
 */
export const validateBankLedgerEntry = [
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('referenceType')
    .isIn(['Online', 'Cash'])
    .withMessage('Reference type must be either Online or Cash'),
  body('amountAdded')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount added must be a positive number'),
  body('amountWithdrawn')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount withdrawn must be a positive number'),
  validate,
];

