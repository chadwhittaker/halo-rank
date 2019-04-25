// =====================
// SOLAR PANELS
// =====================
export const panels = [{
  name:           "SPS - 300W",
  manuf:          "SPS",
  pmax:           300,        // watts
  vmp:            36.4,       // volts
  imp:            8.26,       // amps
  voc:            44.82,      // volts
  isc:            8.88,       // amps
  cost:           250,        // USD
  area:           1.82        // meters squared
}];

// =====================
// INVERTERS
// =====================
export const inverters = [
  {
      name:       "blank",
      manuf:      "blank",
      phase:      0,
      p_cont:     0,
      p_30m:      0,
      p_surge:    0,
      eff:        0.0,
      p_charger:  0,
      pv_max:     0,
      cost:       0,
      ideal_string_size:  0,
      max_num_strings:    0,
      multicluster:       false,
      ACinverter:         false
  },
  {
      name:       "FLEXpower One",
      manuf:      "Outback",
      phase:      1,
      p_cont:     3000,
      p_30m:      3300,
      p_surge:    5175,
      eff:        0.93,
      p_charger:  4000,
      pv_max:     4000,
      cost:       2692.25,
      ideal_string_size:  3,
      max_num_strings:    4,
      multicluster:       false,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/integrated-systems/flexpower-one-fxr"
  },
  {
      name:       "FLEXpower Two",
      manuf:      "Outback",
      phase:      1,
      p_cont:     6000,
      p_30m:      6600,
      p_surge:    10350,
      eff:        0.93,
      p_charger:  8000,
      pv_max:     8000,
      cost:       5057.25,
      ideal_string_size:  3,
      max_num_strings:    8,
      multicluster:       false,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/integrated-systems/flexpower-two-fxr"
  },
  {
      name:       "FLEXpower Four",
      manuf:      "Outback",
      phase:      1,
      p_cont:     12000,
      p_30m:      13200,
      p_surge:    20700,
      eff:        0.93,
      p_charger:  16000,
      pv_max:     500000,
      cost:       10009.45,
      ideal_string_size:  3,
      max_num_strings:    16,
      multicluster:       false,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/integrated-systems/flexpower-four-fxr"
  },
  {
      name:       "Sunny Island 8.0 (1 Cluster)",
      manuf:      "SMA",
      phase:      3,
      p_cont:     18000,
      p_30m:      24000,
      p_surge:    33000,
      eff:        0.93,
      p_charger:  0,
      pv_max:     36000,
      cost:       7940.01,
      ideal_string_size:  16,
      multicluster:       false,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/battery-inverters/sunny-island-44m-60h-80h.html"
  },
  {
      name:       "Sunny Island 8.0 (2 Clusters)",
      manuf:      "SMA",
      phase:      3,
      p_cont:     36000,
      p_30m:      48000,
      p_surge:    66000,
      eff:        0.93,
      p_charger:  0,
      pv_max:     72000,        
      cost:       19108.64,
      ideal_string_size:  16,
      multicluster:       true,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/battery-inverters/sunny-island-44m-60h-80h.html"
  },
  {
      name:       "Sunny Island 8.0 (3 Clusters)",
      manuf:      "SMA",
      phase:      3,
      p_cont:     54000,
      p_30m:      72000,
      p_surge:    99000,
      eff:        0.93,
      p_charger:  0,
      pv_max:     108000,
      cost:       29559.79,
      ideal_string_size:  16,
      multicluster:       true,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/battery-inverters/sunny-island-44m-60h-80h.html"
  }
];

// =====================
// BATTERIES
// =====================
export const batteries = [
  {
      name:       "blank",
      manuf:      "blank",
      voltage:    48,
      ahr_8hr:    NaN,
      eff:        NaN,
      imax_charge:    NaN,
      imax_discharge: NaN,
      cost:       NaN,
      ahrFull:    NaN,
      ahrUsable:  NaN,
      energyFull: NaN,
      energyUsable:   NaN
  },
  {
      name:       "Deka - 12V, 1 string",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    210,
      eff:        0.9,
      imax_charge:    67,
      imax_discharge: 225,
      cost:       1860
  },
  {
      name:       "Deka - 12V, 2 strings",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    420,
      eff:        0.9,
      imax_charge:    134,
      imax_discharge: 450,
      cost:       3720
  },
  {
      name:       "Deka - 12V, 3 strings",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    630,
      eff:        0.9,
      imax_charge:    201,
      imax_discharge: 675,
      cost:       5580
  },
  {
      name:       "Deka - 12V, 4 strings",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    840,
      eff:        0.9,
      imax_charge:    268,
      imax_discharge: 900,
      cost:       7440
  },
  {
      name:       "Deka - AVR95-25",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    1140,
      eff:        0.9,
      imax_charge:    203,
      imax_discharge: 1200,
      cost:      13900
  },
  {
      name:       "Deka - AVR95-29",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    1330,
      eff:        0.9,
      imax_charge:    237,
      imax_discharge: 1500,
      cost:      15600
  },
  {
      name:       "Deka - AVR95-33",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    1520,
      eff:        0.9,
      imax_charge:    271,
      imax_discharge: 1700,
      cost:      17547
  },
  {
      name:       "Deka - AVR125-33",
      manuf:      "Deka",
      voltage:    48,
      ahr_8hr:    2000,
      eff:        0.9,
      imax_charge:    355,
      imax_discharge: 2200,
      cost:      20184
  }
];

// =====================
// CHARGERS
// =====================
export const chargers = [
  {
      name:       "FLEXmax 80 (on unit)",
      manuf:      "Outback",
      pmax:       0,          // watts
      vmax:       150,                // volts
      imax:       NaN,     // amps
      eff:        0.97,               // percentage
      cost:       0,                  // USD
      ideal_string_size:  3,
      max_num_strings:    0,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/charge-controllers/flexmax-60-80"
  },
  {
      name:       "FLEXmax 80 (+1)",
      manuf:      "Outback",
      pmax:       4000,                  // watts
      vmax:       150,                    // volts
      imax:       NaN,    // amps
      eff:        0.97,                   // percentage
      cost:       343.75,                      // USD
      ideal_string_size:  3,
      max_num_strings:    4,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/charge-controllers/flexmax-60-80"
  },
  {
      name:       "FLEXmax 80 (+2)",
      manuf:      "Outback",
      pmax:       8000,                  // watts
      vmax:       150,                    // volts
      imax:       NaN,    // amps
      eff:        0.97,                   // percentage
      cost:       687.50,                      // USD
      ideal_string_size:  3,
      max_num_strings:    8,
      ACinverter:         false,
      link:   "http://www.outbackpower.com/products/charge-controllers/flexmax-60-80"
  },
  {
      name:       "Sunny Tripower 25000TL (x1)",
      manuf:      "SMA",
      pmax:       25550,                  // watts
      vmax:       1000,                    // volts
      imax:       66,    // amps
      eff:        0.97,                   // percentage
      cost:       2706.23,                      // USD
      ideal_string_size:  16,
      max_num_strings:    6,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/solarinverters/sunny-tripower-15000tl-20000tl-25000tl.html"
  },
  {
      name:       "Sunny Tripower 25000TL (x2)",
      manuf:      "SMA",
      pmax:       51100,                  // watts
      vmax:       1000,                    // volts
      imax:       132,    // amps
      eff:        0.97,                   // percentage
      cost:       5412.46,                      // USD
      ideal_string_size:  16,
      max_num_strings:    12,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/solarinverters/sunny-tripower-15000tl-20000tl-25000tl.html"
  },
  {
      name:       "Sunny Tripower 25000TL (x3)",
      manuf:      "SMA",
      pmax:       76650,                  // watts
      vmax:       1000,                    // volts
      imax:       198,    // amps
      eff:        0.97,                   // percentage
      cost:       8118.69,                      // USD
      ideal_string_size:  16,
      max_num_strings:    18,
      ACinverter:         true,
      link:   "https://www.sma.de/en/products/solarinverters/sunny-tripower-15000tl-20000tl-25000tl.html"
  }
];