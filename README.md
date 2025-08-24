
# Consensus Layer Reward Estimator

Estimate Ethereum CL rewards and see how latency affects missed duties and annual ETH per validator.

Live demo: https://cl-rewards-estimator.netlify.app/

## Usage

1. **Inputs panel:** Set Target/Head/Source participation, missed Proposals/Sync, baseline ETH/APR, validator count, and optional ETH price. Results update instantly.
2. **Latency panel:** Enter p50/p90 block arrival times (seconds). Optionally adjust processing overhead (δ). The model predicts late arrivals and MER impact.
3. **Compare:** See predicted MER, ETH/year, and delta vs your current settings.

## How it works

- Rewards use Altair/Bellatrix weights:
	- Source: 14/64
	- Target: 26/64
	- Head: 14/64
	- Proposer: 8/64
	- Sync: 2/64
- Latency model fits a lognormal from p50/p90 and estimates late arrivals after a soft deadline (4.0 − δ).
- MER and ETH/year update live as you change inputs.

## Formula

MER_fraction = (14×Source + 26×Target + 14×Head + 8×Proposer + 2×Sync) / 64
ETH_per_validator_year = MER_fraction × Baseline_ETH
APR_CL_only = MER_fraction × Baseline_APR

## Defaults

- Baseline: 0.997 ETH/year, 3.11% APR
- Processing overhead δ: 0.20 s
- Latency-only: base misses = 0

## Files

- index.html
- latency_mer_model.js

Serve with any static server and open the local URL.

## Customization

- Adjust baseline ETH/APR, participation, fleet size, and latency in the UI.
- Advanced: tune coefficients in `latency_mer_model.js` for calibration.

## License

Open source. Use and modify for validator operations and analysis.
