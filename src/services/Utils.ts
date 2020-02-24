export const Utils = {
  sanitizeHtml(html: string): string {
    return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
}