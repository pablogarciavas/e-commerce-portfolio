import { saveToStorage, getFromStorage, removeFromStorage, clearStorage } from '../storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('saveToStorage', () => {
    it('saves data to localStorage', () => {
      const data = { test: 'value' }
      saveToStorage('testKey', data)
      
      const stored = localStorage.getItem('testKey')
      expect(JSON.parse(stored)).toEqual(data)
    })
  })

  describe('getFromStorage', () => {
    it('retrieves data from localStorage', () => {
      const data = { test: 'value' }
      localStorage.setItem('testKey', JSON.stringify(data))
      
      expect(getFromStorage('testKey')).toEqual(data)
    })

    it('returns default value if key does not exist', () => {
      expect(getFromStorage('nonExistent', 'default')).toBe('default')
      expect(getFromStorage('nonExistent', [])).toEqual([])
    })
  })

  describe('removeFromStorage', () => {
    it('removes data from localStorage', () => {
      localStorage.setItem('testKey', 'value')
      removeFromStorage('testKey')
      
      expect(localStorage.getItem('testKey')).toBeNull()
    })
  })

  describe('clearStorage', () => {
    it('clears all localStorage', () => {
      localStorage.setItem('key1', 'value1')
      localStorage.setItem('key2', 'value2')
      
      clearStorage()
      
      expect(localStorage.length).toBe(0)
    })
  })
})

