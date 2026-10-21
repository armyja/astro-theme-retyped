/**
 * 递归合并配置（数组整体覆盖，对象逐层合并）。
 * @param {object} target
 * @param {object} source
 */
export function deepMerge(target, source) {
  const output = { ...target }
  for (const [key, sourceValue] of Object.entries(source ?? {})) {
    if (sourceValue === undefined)
      continue
    const targetValue = output[key]
    if (
      typeof sourceValue === 'object'
      && sourceValue !== null
      && !Array.isArray(sourceValue)
      && typeof targetValue === 'object'
      && targetValue !== null
      && !Array.isArray(targetValue)
    ) {
      output[key] = deepMerge(targetValue, sourceValue)
    }
    else {
      output[key] = sourceValue
    }
  }
  return output
}
