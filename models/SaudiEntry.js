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
      min: [0.01, 'Riyal rate must be greater than zero'],
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
saudiEntrySchema.pre('save', function (next) {
  if (this.riyalRate && this.riyalRate !== 0) {
    // Calculate: PKR AMOUNT / RIYAL RATE = RIYAL AMOUNT
    this.riyalAmount = this.pkrAmount / this.riyalRate;
    // Calculate: RIYAL AMOUNT - SUBMITTED SAR = Balance
    this.balance = this.riyalAmount - this.submittedSar;
  }
  next();
});

// Index for faster queries
saudiEntrySchema.index({ date: -1 });
saudiEntrySchema.index({ refNo: 1 }, { unique: false }); // Non-unique index for query performance

const SaudiEntry = mongoose.model('SaudiEntry', saudiEntrySchema);

export default SaudiEntry;

