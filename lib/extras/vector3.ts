class Vector3<T> {
	public x: T;
	public y: T;
	public z: T;
	constructor(x: T, y: T, z: T) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	public isEqual(other: Vector3<T>): boolean {
		return this.x === other.x && this.y === other.y && this.z === other.z;
	}
}