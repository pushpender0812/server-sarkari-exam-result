const mongoose = require("mongoose");

const admitCardSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Addjob',  // Reference to the 'Addjob' model
    required: true
  },
  admit_card_date: {
    type: String
  },
  admit_card_link: {
    type: String
  },
  slug: {
    type: String,
    unique:true
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate the slug
admitCardSchema.pre('save', async function (next) {
  if (!this.isModified('slug')) {
    // Populate job_id to access title
    await this.populate('job_id'); // Populate the job_id to get the title

    // Check if the job_id contains a title (if Addjob schema has title)
    if (this.job_id && this.job_id.title) {
      // Use only the first 6 characters of the _id
      const idPart = this._id.toString().slice(0, 6);
  
      // Generate slug by combining the title and the sliced _id part
      this.slug = this.job_id.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .trim() + '-' + idPart;        // Append sliced _id part
    }
  }
  next();
});

const AdmitCard = mongoose.model('AdmitCard', admitCardSchema);

module.exports = AdmitCard;
