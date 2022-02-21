class ValidationContract {

    private _errors: { message: string } [] = [];

    isRequired(value: string, message: string): void {
        if (!value || value.length <= 0)
            this._errors.push({
                message: message
            });
    }

    hasMinLen(value: string, min: number, message: string): void {
        if (!value || value.length < min)
            this._errors.push({
                message: message
            });
    }

    hasMaxLen(value: string, max: number, message: string): void {
        if (!value || value.length > max)
            this._errors.push({
                message: message
            });
    }

    isFixedLen(value: string, len: number, message: string): void {
        if (!value || value.length !== len)
            this._errors.push({
                message: message
            });
    }

    isEmail(value: string, message: string): void {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!value || !reg.test(value))
            this._errors.push({
                message: message
            });
    }

    errors(): { message: string; }[] {
        return this._errors;
    }

    clear(): void {
        this._errors = [];
    }

    isValid(): boolean {
        return this._errors.length === 0;
    }
}

export default ValidationContract;