/**
 * 2018-12-10@lwsu
 *   This file extend the feature of the Data Object
 *   This file required "sprintf" module
 *   Using Number.NaN to present invalid Date
 */

(function () {
    var oldCB = window.CB,
        CB = {};

    CB.date = {version: '1.0'};

        if (typeof(sprintf) == 'undefined') {
            alert("cb.date requires sprintf module");
            return;
        }

    if (!Date.prototype.clone) {
        Date.prototype.clone = function(v) {
            return new Date(this.valueOf());
        };
    }

    if (!Date.prototype.utcnow) {
        Date.prototype.utcnow = function(v) {
            return new Date().toUTC();
        };
    }

    if (!Date.prototype.addSeconds) {
        Date.prototype.addSeconds = function(v) {
            return new Date(this.valueOf() + (v * 1000));
        };
    }
    if (!Date.prototype.diffSeconds) {
        Date.prototype.diffSeconds = function(v) {
            return parseInt((this - v)/1000);
        };
    }

    if (!Date.prototype.addMinutes) {
        Date.prototype.addMinutes = function(v) {
            return new Date(this.valueOf() + (v * 60 * 1000));
        };
    }
    if (!Date.prototype.diffMinutes) {
        Date.prototype.diffMinutes = function(v) {
            return parseInt((this - v)/(60*1000));
        };
    }

    if (!Date.prototype.addHours) {
        Date.prototype.addHours = function(v) {
            return new Date(this.valueOf() + (v * 60 * 60 * 1000));
        };
    }
    if (!Date.prototype.diffHours) {
        Date.prototype.diffHours = function(v) {
            return parseInt((this - v)/(60*60*1000));
        };
    }

    if (!Date.prototype.addDays) {
        Date.prototype.addDays = function(v) {
            return new Date(this.valueOf() + (v * 24 * 60 * 60 * 1000));
        };
    }
    if (!Date.prototype.diffDays) {
        Date.prototype.diffDays = function(v) {
            return parseInt((this - v)/(24*60*60*1000));
        };
    }

    if (!Date.prototype.DTGFormat) {
        Date.prototype.DTGFormat = '%Y%m%d%H%M';
    }
    if (!Date.setDTGFormat) {
        Date.setDTGFormat = function(format) {
            Date.prototype.DTGFormat = format;
            return this;
        };
    }
    if (!Date.prototype.RegularFormat) {
        Date.prototype.RegularFormat = '%Y-%m-%d %H:%M';
    }
    if (!Date.setRegularFormat) {
        Date.setRegularFormat = function(format) {
            Date.prototype.RegularFormat = format;
            return this;
        };
    }

    /**
     * set a private datetime string format for it self
     */
    if (!Date.prototype.setFormat) {
        Date.prototype.setFormat = function(format) {
            this.selfFormat = format;
            return this;
        };
    }

    if (!Date.prototype.strftime) {
        Date.prototype.strftime = function(format) {
            if (!format) {
                if (!this.selfFormat) {
                    format = this.RegularFormat;
                }
                else {
                    format = this.selfFormat;
                }
            }
            var dayNames = ["日", "一", "二", "三", "四", "五", "六"];

            format = format.replace('%Y', sprintf('%d', this.getFullYear()));
            format = format.replace('%m', sprintf('%02d', this.getMonth()+1));
            format = format.replace('%d', sprintf('%02d', this.getDate()));
            format = format.replace('%-a', sprintf('%s', dayNames[this.getDay()]));
            format = format.replace('%H', sprintf('%02d', this.getHours()));
            format = format.replace('%M', sprintf('%02d', this.getMinutes()));
            format = format.replace('%S', sprintf('%02d', this.getSeconds()));
            return format;
        };
    }
    if (!Date.prototype.strftimez) {
        Date.prototype.strftimez = function(format) {
            if (!format) {
                if (!this.selfFormat) {
                    format = this.RegularFormat;
                }
                else {
                    format = this.selfFormat;
                }
            }
            var dayNames = ["日", "一", "二", "三", "四", "五", "六"];

            var utc = this.addMinutes(this.getTimezoneOffset());

            format = format.replace('%Y', sprintf('%d', utc.getFullYear()));
            format = format.replace('%m', sprintf('%02d', utc.getMonth()+1));
            format = format.replace('%d', sprintf('%02d', utc.getDate()));
            format = format.replace('%-a', sprintf('%s', dayNames[this.getDay()]));
            format = format.replace('%H', sprintf('%02d', utc.getHours()));
            format = format.replace('%M', sprintf('%02d', utc.getMinutes()));
            format = format.replace('%S', sprintf('%02d', utc.getSeconds()));
            return format;
        };
    }
    if (!Date.prototype.dtgftimez) {
        Date.prototype.dtgftimez = function() {
            return this.toUTC().strftime(this.DTGFormat);
        };
    }

    if (!Date.strptime) {
        /**
         * Parse String to Date
         * @param date_str
         * @param format: if undefined, using default RegularFormat (Use setFormat to set RegularFormat)
         * @return: Date object or Number.NaN if given string if not a valid date format
         */
        Date.strptime = function(date_str, format) {
            if (!format) {
                format = Date.prototype.RegularFormat;
            }

            var _reg_comp = {
                year: format.indexOf('%Y'),
                month: format.indexOf('%m'),
                day: format.indexOf('%d'),
                hour: format.indexOf('%H'),
                minute: format.indexOf('%M'),
                second: format.indexOf('%S')
            };

            var _reg_idx = {
                year: -1,
                month: -1,
                day: -1,
                hour: -1,
                minute: -1,
                second: -1
            };

            for (var _key in _reg_idx) {
                var _idx = _reg_comp[_key];
                if (_idx == 0) {
                    _reg_idx[_key] = _idx;
                }
                else if (_idx > 0) {
                    var _sorted_idx = 0;
                    for (var _i in _reg_comp) {
                        if (_i == _key) {continue;}
                        if (_reg_comp[_i]>=0 && _reg_comp[_i] < _idx) {
                            _sorted_idx ++;
                        }
                    }
                    _reg_idx[_key] = _sorted_idx;
                }
            }

            format = format.replace('%Y', "(\\d{4})");
            format = format.replace('%m', "(\\d{2})");
            format = format.replace('%d', "(\\d{2})");
            format = format.replace('%H', "(\\d{2})");
            format = format.replace('%M', "(\\d{2})");
            format = format.replace('%S', "(\\d{2})");

            var _reg = new RegExp(format),
                _rs = date_str.match(_reg);

            if (_rs) {
                try {
                    var new_dt = new Date();

                    if (_reg_idx.year >= 0) {
                        new_dt.setFullYear(_rs[_reg_idx.year+1]);
                    }

                    if (_reg_idx.month >= 0) {
                        if (_reg_idx.day >= 0) {
                            new_dt.setMonth(_rs[_reg_idx.month+1] - 1,
                                            _rs[_reg_idx.day+1]);
                        }
                        else {
                            //
                            // set day as first
                            //
                            new_dt.setMonth(_rs[_reg_idx.month+1] - 1, 1);
                        }
                    }
                    else if (_reg_idx.day >= 0) {
                        new_dt.setDate(_rs[_reg_idx.day+1]);
                    }

                    if (_reg_idx.hour >= 0) {
                        new_dt.setHours(_rs[_reg_idx.hour+1]);
                    }
                    else {
                        new_dt.setHours(0);
                    }

                    if (_reg_idx.minute >= 0) {
                        new_dt.setMinutes(_rs[_reg_idx.minute+1]);
                    }
                    else {
                        new_dt.setMinutes(0);
                    }

                    if (_reg_idx.second >= 0) {
                        new_dt.setSeconds(_rs[_reg_idx.second+1]);
                    }
                    else {
                        new_dt.setSeconds(0);
                    }

                    new_dt.setMilliseconds(0);

                    return new_dt;
                }
                catch (e) { return Number.NaN; }
            }
            return Number.NaN;
        };
    }

    if (!Date.dtgptimez) {
        //
        // 2018-12-10@lwsu
        //   資料來源字串一定要是 UTC 時間
        //   如果不是，就再串接 setTimezone
        //
        Date.dtgptimez = function(dtg_str) {
            var _dt = Number.NaN;
            if (dtg_str.length == 6) {
                _dt = Date.strptime(dtg_str, "%Y%m");
            }
            else if (dtg_str.length == 8) {
                _dt = Date.strptime(dtg_str, "%Y%m%d");
            }
            else if (dtg_str.length == 10) {
                _dt = Date.strptime(dtg_str, "%Y%m%d%H");
            }
            else if (dtg_str.length == 12) {
                _dt = Date.strptime(dtg_str, "%Y%m%d%H%M");
            }
            else if (dtg_str.length == 14) {
                _dt = Date.strptime(dtg_str, "%Y%m%d%H%M%S");
            }
            if (!isNaN(_dt)) {
                _dt.selfTimezone = 0;
            }
            return _dt;
        };
    }

    /**
     * we can set a private time zone for it self
     */
    if (!Date.prototype.setTimezone) {
        Date.prototype.setTimezone = function(time_zone) {
            /* set time zone as TimezoneOffset in minutes */
            this.selfTimezone = -1 * time_zone;
            return this;
        };
    }
    if (!Date.prototype.getTimezone) {
        Date.prototype.getTimezone = function() {
            /* return convert time zone from TimezoneOffset in minutes */
            if (this.selfTimezone === undefined) {
                this.selfTimezone = this.getTimezoneOffset();
            }
            return -1 * this.selfTimezone;
        };
    }

    if (!Date.prototype.isUTC) {
        Date.prototype.isUTC = function() {
            var _tz = this.getTimezone();
            if (_tz == 0) {
                return true;
            }
            else {
                return false;
            }
        };
    }

    if (!Date.prototype.toUTC) {
        //
        // Convert to UTC datetime value with selfTimezone
        // and return new Date object with selfTimezone as UTC
        //
        Date.prototype.toUTC = function() {
            var _tz = this.getTimezone();
            if (_tz == 0) {
                return this;
            }
            else {
                return this.addMinutes(-1*_tz).beUTC();
            }
        };
    }
    if (!Date.prototype.toLST) {
        //
        // convert to LST datetime value with selfTimezone
        // and return new Date object with selfTimezone as LST
        //
        Date.prototype.toLST = function() {
            var _toff = this.getTimezoneOffset();
            var _tz = this.getTimezone();
            if (_toff == _tz) {
                return this;
            }
            else {
                return this.addMinutes(-1 * (_tz + _toff)).beLST();
            }
        };
    }

    if (!Date.prototype.beUTC) {
        //
        // Declare this is UTC Time.
        // Set timeznoe as UTC, datetime value has not changed.
        //
        Date.prototype.beUTC = function() {
            this.selfTimezone = 0;
            return this;
        };
    }
    if (!Date.prototype.beLST) {
        //
        // Declare this is Local Time. (Using TimezoneOffset of this browser)
        // Set timeznoe as LST, datetime value has not changed.
        //
        Date.prototype.beLST = function() {
            this.selfTimezone = new Date().getTimezoneOffset();
            return this;
        };
    }

}());
