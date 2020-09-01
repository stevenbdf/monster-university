import React, { Component } from 'react'
import NavbarComponent from '../../components/navbar'
import Datatable from '../../components/datatable'
import { DoughnutChart, PieChart } from '../../components/charts'
import { getByStatus, countByStatus, countByCareer } from '../../controllers/request'

export default class Dashboard extends Component {

    state = {
        completed: {
            columns: [
                {
                    label: 'Codigo',
                    field: 'id_candidate',
                    sort: 'asc'
                },
                {
                    label: 'Nombres',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Apellidos',
                    field: 'last_name',
                    sort: 'asc'
                },
                {
                    label: 'Insitución procedencia',
                    field: 'school',
                    sort: 'asc'
                },
                {
                    label: 'Bachillerato',
                    field: 'title',
                    sort: 'asc'
                }, 
                {
                    label: 'Inicio',
                    field: 'init_year',
                    sort: 'asc'
                },
                {
                    label: 'Fin',
                    field: 'end_year',
                    sort: 'asc'
                },
                {
                    label: 'Fecha de Nacimiento',
                    field: 'birthday',
                    sort: 'asc'
                },
                {
                    label: 'DUI',
                    field: 'dui',
                    sort: 'asc'
                },
                {
                    label: 'NIT',
                    field: 'nit',
                    sort: 'asc'
                },
                {
                    label: 'Teléfono',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'Celular',
                    field: 'cell_phone',
                    sort: 'asc'
                },
                {
                    label: 'Carrera seleccionada',
                    field: 'career',
                    sort: 'asc'
                },
                {
                    label: 'Reporte',
                    field: 'report',
                    sort: 'asc'
                }
            ],
            rows: []
        },
        incomplete: {
            columns: [
                {
                    label: 'Codigo',
                    field: 'id_candidate',
                    sort: 'asc'
                },
                {
                    label: 'Nombres',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Apellidos',
                    field: 'last_name',
                    sort: 'asc'
                },
                {
                    label: 'Insitución procedencia',
                    field: 'school',
                    sort: 'asc'
                },
                {
                    label: 'Bachillerato',
                    field: 'title',
                    sort: 'asc'
                }, 
                {
                    label: 'Inicio',
                    field: 'init_year',
                    sort: 'asc'
                },
                {
                    label: 'Fin',
                    field: 'end_year',
                    sort: 'asc'
                },
                {
                    label: 'Fecha de Nacimiento',
                    field: 'birthday',
                    sort: 'asc'
                },
                {
                    label: 'DUI',
                    field: 'dui',
                    sort: 'asc'
                },
                {
                    label: 'NIT',
                    field: 'nit',
                    sort: 'asc'
                },
                {
                    label: 'Teléfono',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'Celular',
                    field: 'cell_phone',
                    sort: 'asc'
                },
                {
                    label: 'Carrera seleccionada',
                    field: 'career',
                    sort: 'asc'
                },
                {
                    label: 'Reporte',
                    field: 'report',
                    sort: 'asc'
                }
            ],
            rows: []
        },
        dataStatusChart: {
            completed: 0,
            incomplete: 0
        },
        dataCareerChart: {
            labels: [],
            data: []
        }
    }

    links = [
        { name: 'Mi perfil', route: '/profile_manager' },
        { name: 'Managers', route: '/managers' },
        { name: 'Carreras', route: '/careers' },
        { name: 'Instituciones', route: '/institutions' },
        { name: 'Bachilleratos', route: '/titles' }
    ]

    loadComplete = async () => {
        let data = new FormData()
        data.append('completed', 1)
        const res = await getByStatus(data)
        if (res.status) {
            let { completed } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <a
                            href={`http://localhost/monster_university_backend/reports/request.php?id_candidate=${item.id_candidate}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-info">
                            Generar
                            </a>
                    </div>
                )
            )
            completed.rows = res.data
            this.setState({
                ...this.state
            })
        }
    }

    loadIncomplete = async () => {
        let data = new FormData()
        data.append('completed', 0)
        const res = await getByStatus(data)
        if (res.status) {
            let { incomplete } = this.state
            res.data.map(item =>
                item.handle = (
                    <div className="d-flex justify-content-around">
                        <a
                            href={`http://localhost/monster_university_backend/reports/request.php?id_candidate=${item.id_candidate}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-info">
                            Generar
                            </a>
                    </div>
                )
            )
            incomplete.rows = res.data
            this.setState({
                ...this.state
            })
        }
    }

    loadStatusChart = async () => {
        const res = await countByStatus()
        if (res.status) {
            let { dataStatusChart } = this.state
            dataStatusChart.completed = res.data.completed
            dataStatusChart.incomplete = res.data.incomplete
            this.setState({
                ...this.state,
                dataStatusChart
            })
        }
    }

    loadCareerChart = async () => {
        const res = await countByCareer()
        if (res.status) {
            let { dataCareerChart } = this.state
            let labels = res.data.map(item => item.career)
            let data = res.data.map(item => item.quantity)
            dataCareerChart.labels = labels
            dataCareerChart.data = data
            this.setState({
                ...this.state,
                dataCareerChart
            })
        }
    }

    async componentDidMount() {
        await this.loadComplete()
        await this.loadIncomplete()
        await this.loadStatusChart()
        await this.loadCareerChart()
    }

    render() {
        let { completed, incomplete, dataStatusChart, dataCareerChart } = this.state
        return (
            <React.Fragment>
                <NavbarComponent links={this.links}
                    logout_manager={true} history={this.props.history} />
                <div className="col-12 col-md-10 offset-md-1 ">
                    <h1>Dashboard</h1>
                    <h4 className="mt-4">Solicitudes completas</h4>
                    <Datatable data={completed} />
                    <h4 className="mt-4">Solicitudes incompletas</h4>
                    <Datatable data={incomplete} />
                    <h1 className="mt-4 mb-4">Reportes</h1>
                    <div className="row mb-5">
                        <div className="col-12 col-md-6">
                            <p>Candidatos por carrera</p>
                            <a
                                href={'http://localhost/monster_university_backend/reports/candidatesCareer.php'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-info">
                                Generar
                            </a>
                        </div>
                        <div className="col-12 col-md-6">
                            <p>Candidatos por institución</p>
                            <a
                                href={'http://localhost/monster_university_backend/reports/candidatesSchool.php'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-info">
                                Generar
                            </a>
                        </div>
                    </div>
                    <h1 className="mt-4 mb-4">Gráficos</h1>
                    <div className="row mb-5">
                        <div className="col-12 col-md-6">
                            <p>Solicitudes completas e incompletas</p>
                            <DoughnutChart
                                labels={['Completas', 'Incompletas']}
                                data={[dataStatusChart.completed, dataStatusChart.incomplete]}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <p>Solicitudes por carreras</p>
                            <PieChart
                                labels={dataCareerChart.labels}
                                data={dataCareerChart.data}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}