class Target {
    inCircle = 0;
    iterations = 0;

    throwDart() {
        let dart = new Dart(this.LC_Gen(), this.LC_Gen());
        this.iterations++;
        if (dart.isInCircle)
            this.inCircle++;
        return dart;
    }

    getPi() {
        return 4 * this.inCircle / this.iterations;
    }

    LC_Gen() {
        return z = (a * z + c) % m;
    }

    setValues() {
        a = parseInt(document.getElementById('a').value);
        c = parseInt(document.getElementById('c').value);
        m = parseInt(document.getElementById('m').value);
        if ($('#manual').prop("checked") == false) {
            $('#z').val(new Date().getTime() / 1000);
        } else {
            z = parseInt(document.getElementById('z').value);
        }
        numberOfIterations = parseInt($("#iter").val());
        $("#total").after("<span id=alliter>/" + numberOfIterations + "</span>")
    }

    getPiAccuracy() {
        const pi = '3.14159265358979323';
        let computed = this.getPi().toString();
        for (let i = 0; i < computed.length; i++)
            if (pi[i] !== computed[i])
                return i;
        return computed.length;
    }

    getPiHighlighted() {
        let pi = this.getPi().toString();
        let accuracy = this.getPiAccuracy();
        if (accuracy > 0)
            return '<span id="correct-digits">' + pi.slice(0, accuracy) + '</span>' + pi.slice(accuracy);
        return pi;
    }

    getPiError() {
        const pi = 3.14159265358979323;
        return ((pi - this.getPi()) / pi).toFixed(5) + '%';
    }
}