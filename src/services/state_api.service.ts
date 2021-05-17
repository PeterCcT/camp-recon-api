import axios from 'axios'

export class StateApiService {

    private baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades'

    async getAllUfs() {
        const url = `${this.baseUrl}/estados?orderBy=sigla`
        const { data } = await axios.get(url)
        const ufs = []
        for (const state of data) {
            ufs.push({
                'uf': state.sigla,
                'name': state.nome
            })
        }
        return ufs
    }
    async getAllCitiesFromUf(uf: string) {
        const url = `${this.baseUrl}/estados/${uf}/municipios`
        const { data } = await axios.get(url)
        const cities = []
        for (const citie of data) {
            cities.push(citie.nome)
        }
        return cities
    }
}