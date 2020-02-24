import { HeaderComponent } from './Header'

describe('HeaderComponent', () => {
    const component = new HeaderComponent();

    test('shows the correct title', () => {
        // Arrange
        component.state.title = 'Test Title';

        // Act
        component.render();

        // Assert
        expect(component.innerHTML).toContain('Test Title');
    })
})
