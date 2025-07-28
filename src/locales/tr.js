export default {
  // Navigation
  nav: {
    title: 'Biosphere Map',
    home: 'Home',
    about: 'About',
    contact: 'Contact'
  },

  // Search
  search: {
    placeholder: 'Search species (e.g. butterfly, seagull, fox)',
    placeholderMobile: 'Search species...',
    loading: 'Loading...',
    noResults: 'No results found',
    suggestions: 'Suggestions'
  },

  // Map
  map: {
    loading: 'Loading map...',
    noSpecies: 'No species found yet',
    selectSpecies: 'Select a species from the map or search above',
    totalSpecies: 'species found'
  },

  // Species Card
  species: {
    taxonomy: 'Taxonomy',
    location: 'Location',
    observationDate: 'Observation Date',
    description: 'Description',
    noDescription: 'No description available for this species.',
    loadingSummary: 'Summary Loading...',
    wikipediaError: 'Wikipedia summary not available.',
    readOnWikipedia: 'Read on Wikipedia',
    viewOnINaturalist: 'View on iNaturalist',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites'
  },

  // Filters
  filters: {
    title: 'Filters',
    clear: 'Clear',
    category: 'Category',
    allCategories: 'All Categories',
    region: 'Region',
    allRegions: 'All Regions',
    threatStatus: 'Threat Status',
    allSpecies: 'All Species',
    endemic: 'Endemic Species',
    threatened: 'Threatened',
    common: 'Common Species',
    textSearch: 'Text Search',
    textPlaceholder: 'Species name or description...',
    specialFilters: 'Special Filters',
    onlyEndemic: 'Only Endemic Species',
    onlyThreatened: 'Only Threatened Species',
    stats: {
      total: 'Total',
      activeFilters: 'Active filters'
    }
  },

  // Favorites
  favorites: {
    title: 'Favorite Species',
    empty: 'You have no favorite species yet.',
    emptyHint: 'Select a species from the map and click the ⭐ button.',
    remove: 'Remove from favorites'
  },

  // Observation Form
  observation: {
    title: 'Add New Observation',
    speciesName: 'Species Name',
    speciesNameRequired: 'Species name is required',
    scientificName: 'Scientific Name',
    location: 'Location',
    locationRequired: 'Location is required',
    coordinates: 'Coordinates',
    latitude: 'Latitude',
    longitude: 'Longitude',
    latitudeError: 'Enter a valid latitude (-90 to 90)',
    longitudeError: 'Enter a valid longitude (-180 to 180)',
    date: 'Observation Date',
    habitat: 'Habitat',
    behavior: 'Behavior',
    weather: 'Weather',
    description: 'Description',
    notes: 'Notes',
    photos: 'Photos',
    selectPhotos: 'Select Photos',
    submit: 'Submit Observation',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    submitError: 'Error submitting observation',
    placeholders: {
      speciesName: 'E.g. Red fox',
      scientificName: 'E.g. Vulpes vulpes',
      location: 'E.g. Ankara, Turkey',
      habitat: 'E.g. Forest, meadow, lakeside',
      behavior: 'E.g. Feeding, sleeping, caring for young',
      weather: 'E.g. Sunny, rainy, windy',
      description: 'Detailed information about the observation...',
      notes: 'Additional notes, special cases...'
    }
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    submit: 'Submit',
    reset: 'Reset',
    clear: 'Clear',
    select: 'Select',
    choose: 'Choose',
    all: 'All',
    none: 'None',
    unknown: 'Unknown',
    notAvailable: 'Not available',
    noData: 'No data',
    empty: 'Empty',
    required: 'Required',
    optional: 'Optional',
    more: 'More',
    less: 'Less',
    show: 'Show',
    hide: 'Hide',
    expand: 'Expand',
    collapse: 'Collapse',
    open: 'Open',
    close: 'Close',
    download: 'Download',
    upload: 'Upload',
    share: 'Share',
    print: 'Print',
    export: 'Export',
    import: 'Import',
    refresh: 'Refresh',
    reload: 'Reload',
    retry: 'Retry',
    continue: 'Continue',
    finish: 'Finish',
    complete: 'Complete',
    confirm: 'Confirm',
    verify: 'Verify',
    validate: 'Validate',
    check: 'Check',
    review: 'Review',
    approve: 'Approve',
    reject: 'Reject',
    accept: 'Accept',
    decline: 'Decline',
    enable: 'Enable',
    disable: 'Disable',
    activate: 'Activate',
    deactivate: 'Deactivate',
    start: 'Start',
    stop: 'Stop',
    pause: 'Pause',
    resume: 'Resume',
    restart: 'Restart'
    // The rest of the long "common" block with repeated values like measurements, dimensions, actions etc.
    // can be shortened or moved to a separate file if you're not using them all.
  }
};
