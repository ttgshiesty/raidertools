const DEFAULT_ASSET_ORIGIN = 'https://assets.shiesty.me'

const ASSET_ORIGIN = (
  import.meta.env.VITE_ASSETS_URL ||
  DEFAULT_ASSET_ORIGIN
).replace(/\/$/, '')

function filenameFromUrl(value: string): string | null {
  try {
    return new URL(value).pathname.split('/').filter(Boolean).pop() || null
  } catch {
    return null
  }
}

export function getAssetOrigin(): string {
  return ASSET_ORIGIN
}

export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined
  if (/^https?:\/\//i.test(path)) return path
  return `${ASSET_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

export function resolveItemAssetUrl(
  rawValue?: string | null,
  fallbackItemId: string | null = null,
): string | undefined {
  if (
    rawValue &&
    /^https?:\/\/raw\.githubusercontent\.com\/.+\/images\/items\//i.test(rawValue)
  ) {
    const filename = filenameFromUrl(rawValue)
    return filename ? assetUrl(`/items/${filename}`) : rawValue
  }

  if (rawValue && /^https?:\/\/cdn\.arctracker\.io\/items\/v2\//i.test(rawValue)) {
    const filename = filenameFromUrl(rawValue)
    return filename ? assetUrl(`/items/${filename}`) : rawValue
  }

  if (rawValue && /^https?:\/\/cdn\.arctracker\.io\/items\//i.test(rawValue)) {
    const filename = filenameFromUrl(rawValue)
    return filename ? assetUrl(`/items/${filename}`) : rawValue
  }

  if (rawValue && /^https?:\/\/assets\.shiesty\.me\/items\//i.test(rawValue)) {
    const filename = filenameFromUrl(rawValue)
    return filename ? assetUrl(`/items/${filename}`) : rawValue
  }

  if (rawValue && !/^https?:\/\//i.test(rawValue)) {
    const normalized = String(rawValue).replace(/^\/+/, '')
    if (normalized.startsWith('items/')) return assetUrl(`/${normalized}`)
    return assetUrl(`/items/${normalized.split('/').pop()}`)
  }

  if (fallbackItemId) {
    return assetUrl(`/items/${fallbackItemId}.png`)
  }

  return rawValue ?? undefined
}
