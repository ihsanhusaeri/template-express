/*
 |--------------------------------------------------------------------------
 | Models - Check Point
 |--------------------------------------------------------------------------
 */
const Mongoose = require('mongoose');
const ExampleSchema = Mongoose.Schema({
	ID: String,
	TRACK_CODE: String,
	BA_CODE: String,
	JALUR: String,
	CHECKPOINT: String,
	CHECKPOINT_LAT: String,
	CHECKPOINT_LONG: String,
	DURATION: Number,
	JARAK: Number,
	JUMLAH_TITIK_API: Number,
	DATE_TRACK: {
		type: Number,
		get: v => Math.round(v),
		set: v => Math.round(v),
		alias: 'i'
	},
	LAT_TRACK: String,
	LONG_TRACK: String,
	SYNC_TIME: {
		type: Number,
		get: v => Math.round(v),
		set: v => Math.round(v),
		alias: 'i'
	},
	INSERT_USER: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.round(v),
		set: v => Math.round(v),
		alias: 'i'
	}
});

/*
 |--------------------------------------------------------------------------
 | Exports
 |--------------------------------------------------------------------------
 */
module.exports = Mongoose.model('Tracking_v_1_0', ExampleSchema, 'TR_TRACKING');
