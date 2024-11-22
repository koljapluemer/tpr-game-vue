
export enum StandardSound {
    Success,
    Wrong,
    Failure
}

export const StandardSoundFiles = {
    [StandardSound.Success]: '/assets/sounds/success_short.mp3',
    [StandardSound.Wrong]: '/assets/sounds/wrong_short.mp3',
    [StandardSound.Failure]: '/assets/sounds/wrong_long.mp3',
}