
export default class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

    éSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
    }

    geraNovoCpf() {
        const cpfSemDgitos = this.cpfLimpo.slice(0, -2)
        const digito1 = this.geraDigito(cpfSemDgitos)
        const digito2 = this.geraDigito(cpfSemDgitos + digito1)
        this.novoCPF = cpfSemDgitos + digito1 + digito2
    }

    static geraDigito(cpfSemDgitos) {
        let total = 0
        let reverso = cpfSemDgitos.length + 1

        for (let stringNumerica of cpfSemDgitos) {
            total += reverso * stringNumerica
            reverso--
        }

        const digito = 11 - (total % 11)
        return digito > 9 ? String(digito) : '0'
    }

    valida() {
        if(!this.cpfLimpo) return false
        if(typeof this.cpfLimpo !== 'string') return false
        if(this.cpfLimpo.length !== 11) return false
        if(this.éSequencia()) return false
        this.geraNovoCPF()
        return this.novoCPF === this.cpfLimpo
        
    }

}
// console.log( 'Cheguei aqui' );