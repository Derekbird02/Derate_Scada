# ETG Trip Analysis Automation

## 📌 Overview
This project automates the analysis of **ETG trip files** to deliver higher-quality root cause analysis for turbine trips. Traditionally, operators run ETG documents manually to understand why a turbine tripped. This automation replaces that manual process with **scalable Python-based checks** that can be extended to new trip conditions (automations) as needed.

The first implemented automation is for **Trip Event Status Message 267**, but the framework is designed for scalability, allowing each new automation to live in its own file and plug seamlessly into the system.

---

## 🎯 Goals
- Deliver **faster and more consistent** turbine trip root cause analysis.
- Reduce operator manual effort by automating ETG checks.
- Provide a **scalable framework** for adding new automations without code clutter.
- Improve **data accuracy** and ensure trip events are consistently analyzed across sites.

---

## ⚙️ How It Works
1. **Input Data**
   - `base_df` → metadata about the trip.
   - `channels_df` → channel data (signals, sample rates, trip offsets).
   - `events_df` → event log data.

2. **Automation Structure**
   - Each automation is its own file (e.g., `check_267.py`).
   - Each automation contains:
     - A `run()` function (entry point).
     - One or more **blocks** of logic (modular checks).

3. **Example: Automation 267**
   - Filters `channels_df` where:
     - `sample_rate_sec = 0.01`
     - `trip_offset_sec` between **-30 and 30 seconds**
   - Runs the **Actual Vibration Trip Block**:
     - Focuses on `trip_offset_sec` between **-10 and 10 seconds**.
     - Checks if:
       - `mainframe` values are generally increasing.
       - `lateral` goes from `0 → 1`.

   ✅ If both conditions are met → "Likely Actual Vibration Trip detected"  
   ❌ Otherwise → "Conditions not met"

---

## 🛠️ Project Structure

---

## 🚀 Scalability
- Each new automation (e.g., `check_300.py`, `check_412.py`) can be dropped into the project without modifying existing automations.
- Future enhancements:
  - Central registry for available automations.
  - Reporting/visualization of automation results.
  - Integration with operator dashboards.

---

## ▶️ Usage
```bash
# Run automation 267
python main.py --automation 267 --base base_file.parquet --channels channels_file.parquet --events events_file.parquet
