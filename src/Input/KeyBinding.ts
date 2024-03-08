export enum Key {
	Forward = "Forward",
	Right = "Right",
	Left = "Left",
	Backward = "Backward",
	Jump = "Jump",
	Left_Click =  "Left_Click",
	Right_Click =  "Right_Click",
	Shift = "Shift",
	Use = "Use",
	One = "One",
	Reload = "Reload",
	Two = "Two",
	Three = "Three",
	Four = "Four",
	Five = "Five",
}
export class KeyBinding {
	private key: Key;
	public isPressed: boolean = false;
	public justPressed: boolean = false;
	public justReleased: boolean = false;

	constructor(key: Key) {
		this.key = key;
	}
	setPressed(pressed: boolean): void {
		this.isPressed = pressed;
		this.justPressed = pressed;
		
	}
	onKeyUp(){
		this.isPressed = false;
		this.justReleased = true;
	}
	resetRelease(){
		this.justReleased = false;
		this.justPressed = false;
		
	}
}