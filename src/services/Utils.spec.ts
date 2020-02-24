import { Utils } from './Utils';

describe('UtilsService', () => {

  describe('HTML Sanitiser', () => {
    test('should sanitize the HTML to prevent XSS attacks', () => {
      // Arrange
      const html = '<script>';

      // Act
      const sanitized = Utils.sanitizeHtml(html);

      // Assert
      expect(sanitized).toBe('&lt;script>');
    });
  })

})
