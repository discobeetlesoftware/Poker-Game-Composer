debugConfig = {
    global: {
        isDebug: false,
        isReadonly: true
    },
    canvas: {
        color: '#cccccc',
        outerColor: '#333333',
        size: {
            height: 768,
            width: 1024
        },
        ratio: {
            title: 0.2,
            detail: 0.1,
            sections: 0.5,
            description: 0.2,
            sectionTitles: 0.05 // inside of sections
        }
    },
    game: {
        title: {
            size: 60,
            family: 'Verdana, sans-serif',
            color: 'black',
            margins: {
                top: 3,
                bottom: 5
            }
        },
        detail: {
            size: 24,
            family: 'Verdana, sans-serif',
            color: 'black'
        },
        description: {
            size: 24,
            family: 'Verdana, sans-serif',
            color: 'black',
            margins: {
                top: 20,
                bottom: 3
            }
        }
    },
    //// Section configuration
    section: {
        title: {
            font: {
                size: 28,
                family: 'Verdana, sans-serif',
                color: '#161616',
            },
            margins: { bottom: 5 },
            padding: { vertical: 0, horizontal: 3 },
            align: 'left',
            valign: 'bottom'
        },
        horizontalSpacing: 30,
    },
    //// Element configuration
    element: {
        horizontalSpacing: 5,
        margins: { top: 0, bottom: 0, left: 0, right: 0 },

        // Detail text
        detail: {
            size: 12,
            color: 'black',
            family: 'Verdana, sans-serif',
            margins: { top: 0, bottom: 0, left: 0, right: 0 }
        },

        // Elemental text
        text: {
            labelWidth: 100,
            font: {
                size: 20,
                family: 'Verdana, sans-serif',
                color: 'black'
            },
            align: 'center',
            valign: 'center',
            backgroundColor: '#FFE500',
            padding: { horizontal: 5, vertical: 5 },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            border: {
                color: '#000',
                width: 1,
                corner: 10
            }
        },

        // Playing card
        card: {
            groupMargin: 5,
            size: { width: 90, height: 140 },
            border: {
                color: '#212121',
                width: 0
            },
            corner: 5,
            pile: {
                offset: { x: 8, y: 3 },
                margins: { top: 0, bottom: 0, left: 0, right: 0 }
            },
            font: {
                size: 12,
                family: 'Verdana, sans-serif',
                color: 'white'
            },
            faceDown: {
                backgroundColor: '#282828',
                font: {
                    color: '#fff',
                    family: 'Courier',
                    size: 60
                },
                border: {
                    color: '#fff',
                    width: 1,
                    corner: 10
                }
            },
            faceUp: {
                backgroundColor: 'blue',
                font: {
                    color: '#fff',
                    family: 'Courier',
                    size: 60
                },
                border: {
                    color: '#fff',
                    width: 1,
                    corner: 10
                },
                pip: {
                    character: '⭑',
                    family: 'Verdana, sans-serif',
                    color: '#fff',
                    size: 18,
                    offset: {
                        x: 4,
                        y: 4
                    }
                }
            }
        },

        // Betting round
        betting_round: {
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            radius: 20,
            offset: 3,
            backgroundColor: '#D20101',
            border: {
                color: '#F3F3F3',
                width: 1
            },
            font: {
                color: 'white',
                size: 18,
                family: 'Verdana, sans-serif'
            }
        }
    }
};









smallConfig = {
    //// Section configuration
    section: {
        title: {
            size: 12,
            family: 'Verdana, sans-serif',
            color: 'black',
            margins: { top: 3, bottom: 3, left: 1, right: 1 }
        },
        margins: { top: 0, bottom: 0, left: 1, right: 1 }
    },
    //// Element configuration
    element: {
        margins: { x: 3, y: 0 },

        // Detail text
        detail: {
            size: 10,
            color: 'black',
            family: 'Verdana, sans-serif',
            margins: { x: 0, y: 3 }
        },

        // Elemental text
        text: {
            fontSize: 10,
            fontFamily: 'Verdana, sans-serif',
            color: 'black',
            backgroundColor: '#d9ffe3',
            margins: { top: 2, bottom: 2, left: 3, right: 3 },
            border: {
                color: '#000',
                width: 1,
                corner: 4
            }
        },

        // Playing card
        card: {
            groupMargin: 2,
            size: { width: 30, height: 45 },
            border: {
                color: '#212121',
                width: 1
            },
            corner: 5,
            pile: {
                offset: { x: 6, y: 3 },
                margins: { top: 0, bottom: 0, left: 3, right: 3 }
            },
            faceDown: {
                backgroundColor: '#d2d9e2',
                fontColor: 'black',
                fontSize: 25
            },
            faceUp: {
                backgroundColor: '#feffe4',
                fontColor: 'black',
                fontSize: 25,
                fontFamily: 'Courier',
                pip: {
                    size: 22,
                    offset: {
                        x: 5,
                        y: 5
                    }
                }
            }
        },

        // Betting round
        betting_round: {
            margins: { top: 0, bottom: 0, left: 3, right: 3 },
            size: { width: 30, height: 22 },
            backgroundColor: '#916ebf',
            fontColor: 'white',
            fontSize: 10,
            fontFamily: 'Courier'
        }
    }
};
config = debugConfig;