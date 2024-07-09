<span className="">
  {site.showFeeders
    ? `${(calculatePowerPotential(assets) - calculateSitePowerActual(assets)) > 0 ? '-' : ''}${(calculatePowerPotential(assets) - calculateSitePowerActual(assets)).toFixed(2)} MW`
    : '@'}
</span>
