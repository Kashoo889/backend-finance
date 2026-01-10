import mongoose from 'mongoose';

const saudiEntrySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      trim: true,
    },
    refNo: {
      type: String,
      required: [true, 'Reference number is required'],
      trim: true,
      uppercase: true,
    },
    pkrAmount: {
      type: Number,
      required: [true, 'PKR amount is required'],
      min: [0, 'PKR amount cannot be negative'],
    },
    riyalRate: {
      type: Number,
      required: [true, 'Riyal rate is required'],
      min: [0, 'Riyal rate cannot be negative'],
    },
    riyalAmount: {
      type: Number,
      default: 0,
    },
    submittedSar: {
      type: Number,
      required: [true, 'Submitted SAR is required'],
      min: [0, 'Submitted SAR cannot be negative'],
      default: 0,
    },
    reference2: {
      type: String,
      trim: true,
      default: '',
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate riyalAmount and balance before saving
// Only auto-calculate if both PKR > 0 AND Rate > 0, otherwise use submittedSar directly
saudiEntrySchema.pre('save', function (next) {
  if (this.pkrAmount > 0 && this.riyalRate > 0) {
    // Auto-calculate: PKR AMOUNT / RIYAL RATE = RIYAL AMOUNT
    this.riyalAmount = this.pkrAmount / this.riyalRate;
    // Calculate: RIYAL AMOUNT - SUBMITTED SAR = Balance
    this.balance = this.riyalAmount - this.submittedSar;
  } else {
    // If PKR = 0 OR Rate = 0, use submittedSar directly
    this.riyalAmount = this.submittedSar;
    this.balance = 0; // No balance calculation when not auto-calculating
  }
  next();
});

// Index for faster queries
saudiEntrySchema.index({ date: -1 });
saudiEntrySchema.index({ refNo: 1 }, { unique: false }); // Non-unique index for query performance

const SaudiEntry = mongoose.model('SaudiEntry', saudiEntrySchema);

export default SaudiEntry;

