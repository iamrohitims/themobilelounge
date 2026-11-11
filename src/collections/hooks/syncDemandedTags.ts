import type { CollectionBeforeChangeHook } from 'payload'

export const syncDemandedTagsBeforeChange: CollectionBeforeChangeHook = async ({ data }) => {
  if (!data) return data

  let tags = Array.isArray(data.tags) ? [...data.tags] : []

  if (data.isMostDemanded === false) {
    // If explicitly deselected, remove 'most-demanded' tag
    tags = tags.filter((t) => t !== 'most-demanded')
    // If not a hot deal either, also remove 'bestseller'
    if (!data.isHotDeal) {
      tags = tags.filter((t) => t !== 'bestseller')
    }
    data.tags = tags
  } else if (data.isMostDemanded === true) {
    // If selected, ensure 'most-demanded' tag is present
    if (!tags.includes('most-demanded')) {
      tags.push('most-demanded')
    }
    data.tags = tags
  }

  return data
}
