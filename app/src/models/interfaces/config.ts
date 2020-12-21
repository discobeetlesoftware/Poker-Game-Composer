interface Configuration {
    game: {
        title: TextConfiguration,
        detail: TextConfiguration,
        description: TextConfiguration
    },

    section: {
        title: TextConfiguration,
        horizontalSpacing: number
    },

    element: {
        horizontalSpacing: number,
        detail: TextConfiguration,
        text: TextConfiguration
    }
}

enum TextAlignment {
    left = 'left',
    right = 'right',
    center = 'center'
}

interface FontConfiguration {
    family: string;
    size: number;
    color: string;
}

interface TextConfiguration {
    font: FontConfiguration,
    align: TextAlignment;
    margins: VerticalMarginsConfiguration;
}

interface VerticalMarginsConfiguration {
    top: number;
    bottom: number;
}

interface MarginsConfiguration {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

interface PointConfiguration {
    x: number;
    y: number;
}

interface BorderConfiguration {
    color: string;
    width: number;
    corner: number;
}

interface PipConfiguration {
    font: FontConfiguration;
    offset: PointConfiguration;
}

interface SizeConfiguration {
    width: number;
    height: number;
}

interface CardElementConfiguration {
    card: {
        groupMargin: number,
        size: SizeConfiguration,
        border: BorderConfiguration,
        pile: {
            offset: PointConfiguration,
            margins: MarginsConfiguration
        },
        faceDown: PlayingCardConfiguration,
        faceUp: PlayingCardConfiguration
    };
}

interface PlayingCardConfiguration {
    backgroundColor: string,
    font: FontConfiguration,
    border: BorderConfiguration,
    pip: PipConfiguration
}

interface BettingRoundConfiguration {
    margins: MarginsConfiguration,
    radius: number,
    offset: number,
    backgroundColor: string,
    border: BorderConfiguration,
    font: FontConfiguration
}