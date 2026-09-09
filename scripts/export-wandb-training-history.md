# Export W&B train/loss + eval/loss for `TrainingCurves`

The article charts load two files:

```text
public/data/wandb-train-loss.csv
public/data/wandb-eval-loss.csv
```

Each is a direct Weights & Biases panel CSV export. Expected columns:

- `train/global_step` — shared x-axis
- a value column whose name contains `train/loss` or `eval/loss` (not `__MIN` / `__MAX`)

Do **not** merge the series into one CSV or interpolate missing eval points. The UI renders them as two stacked charts with separate y-scales.

## Re-export from W&B

1. Open the run → chart for `train/loss` → download CSV → save as `public/data/wandb-train-loss.csv`
2. Open the chart for `eval/loss` → download CSV → save as `public/data/wandb-eval-loss.csv`
3. Refresh the article page

Optional aliases: pass `trainSrc` / `evalSrc` props to `<TrainingCurves />` if you keep timestamped export filenames.
