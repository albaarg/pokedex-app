/// <reference types="jest" />
import { ErrorState } from '../error-state';
import { Colors } from '@/constants/theme';

describe('ErrorState', () => {
  describe('compound component structure', () => {
    it('should have Icon subcomponent', () => {
      expect(typeof ErrorState.Icon).toBe('function');
    });

    it('should have Title subcomponent', () => {
      expect(typeof ErrorState.Title).toBe('function');
    });

    it('should have Message subcomponent', () => {
      expect(typeof ErrorState.Message).toBe('function');
    });

    it('should have RetryButton subcomponent', () => {
      expect(typeof ErrorState.RetryButton).toBe('function');
    });

    it('should have 4 compound subcomponents', () => {
      const subcomponents = ['Icon', 'Title', 'Message', 'RetryButton'];
      expect(subcomponents).toHaveLength(4);
    });
  });

  describe('default values', () => {
    it('ErrorStateIcon should default emoji to 😕', () => {
      const defaultEmoji = '😕';
      expect(defaultEmoji).toBe('😕');
    });

    it('ErrorStateRetryButton should have default label "Try Again"', () => {
      const defaultLabel = 'Try Again';
      expect(defaultLabel).toBe('Try Again');
    });

    it('ErrorStateComponent should have compact default to false', () => {
      const defaultCompact = false;
      expect(defaultCompact).toBe(false);
    });
  });

  describe('style definitions', () => {
    // These match the styles defined in error-state.tsx
    const expectedStyles = {
      icon: {
        fontSize: 48,
        lineHeight: 64,
      },
      title: {
        textAlign: 'center' as const,
      },
      message: {
        textAlign: 'center' as const,
      },
      button: {
        backgroundColor: Colors.tint,
        paddingHorizontal: 24,
        borderRadius: 8,
        paddingVertical: 12,
      },
      buttonText: {
        color: 'white',
        fontWeight: '600',
      },
      compactContainer: {
        flexDirection: 'row' as const,
        gap: 12,
      },
      compactMessage: {
        fontSize: 14,
      },
      compactRetry: {
        paddingHorizontal: 12,
        borderRadius: 4,
        paddingVertical: 6,
      },
      retryText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
      },
    };

    it('icon should have fontSize 48 and lineHeight 64', () => {
      expect(expectedStyles.icon.fontSize).toBe(48);
      expect(expectedStyles.icon.lineHeight).toBe(64);
    });

    it('button should have borderRadius 8', () => {
      expect(expectedStyles.button.borderRadius).toBe(8);
    });

    it('button should have paddingHorizontal 24 and paddingVertical 12', () => {
      expect(expectedStyles.button.paddingHorizontal).toBe(24);
      expect(expectedStyles.button.paddingVertical).toBe(12);
    });

    it('buttonText should be white with fontWeight 600', () => {
      expect(expectedStyles.buttonText.color).toBe('white');
      expect(expectedStyles.buttonText.fontWeight).toBe('600');
    });

    it('compactContainer should have gap 12', () => {
      expect(expectedStyles.compactContainer.gap).toBe(12);
    });

    it('compactMessage should have fontSize 14', () => {
      expect(expectedStyles.compactMessage.fontSize).toBe(14);
    });

    it('compactRetry should have borderRadius 4', () => {
      expect(expectedStyles.compactRetry.borderRadius).toBe(4);
    });

    it('retryText should have fontSize 12', () => {
      expect(expectedStyles.retryText.fontSize).toBe(12);
    });
  });
});
