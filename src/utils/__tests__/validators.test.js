import { validateEmail, validatePassword, validateRequired } from '../validators'

describe('validators', () => {
  describe('validateEmail', () => {
    it('returns true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('returns false for invalid email', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@invalid.com')).toBe(false)
      expect(validateEmail('invalid.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('returns true for valid password (min 6 characters)', () => {
      expect(validatePassword('password123')).toBe(true)
      expect(validatePassword('123456')).toBe(true)
    })

    it('returns false for short password', () => {
      expect(validatePassword('12345')).toBe(false)
      expect(validatePassword('')).toBe(false)
    })
  })

  describe('validateRequired', () => {
    it('returns true for non-empty values', () => {
      expect(validateRequired('text')).toBe(true)
      expect(validateRequired('0')).toBe(true)
    })

    it('returns false for empty values', () => {
      expect(validateRequired('')).toBe(false)
      expect(validateRequired(null)).toBe(false)
      expect(validateRequired(undefined)).toBe(false)
    })
  })
})

