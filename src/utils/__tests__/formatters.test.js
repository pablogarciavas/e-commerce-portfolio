import { formatPrice } from '../formatters'

describe('formatters', () => {
  describe('formatPrice', () => {
    it('formats price with euro symbol', () => {
      const result1 = formatPrice(10)
      expect(result1).toContain('10')
      expect(result1).toContain('€')
      
      const result2 = formatPrice(10.5)
      expect(result2).toContain('10')
      expect(result2).toContain('€')
      
      const result3 = formatPrice(10.99)
      expect(result3).toContain('10')
      expect(result3).toContain('€')
    })

    it('formats large prices correctly', () => {
      const result1 = formatPrice(1000)
      expect(result1).toContain('1000')
      expect(result1).toContain('€')
      
      const result2 = formatPrice(1234.56)
      expect(result2).toContain('1234')
      expect(result2).toContain('€')
    })

    it('handles zero', () => {
      const result = formatPrice(0)
      expect(result).toContain('0')
      expect(result).toContain('€')
    })

    it('handles negative prices', () => {
      const result = formatPrice(-10)
      expect(result).toContain('-10')
      expect(result).toContain('€')
    })
  })
})

