import axios from 'axios'

// Separate axios instance for Django backoffice API
const backoffice = axios.create({
  baseURL: '/backoffice/api',
  headers: { 'Content-Type': 'application/json' },
})

backoffice.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

backoffice.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── Report endpoints ──────────────────────────────────────

export const getReportSummary = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/summary/', { params }).then(r => r.data)

export const getDisbursementReport = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/disbursements/', { params }).then(r => r.data)

export const getCollectionsReport = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/collections/', { params }).then(r => r.data)

export const getDelinquencyReport = () =>
  backoffice.get('/reports/delinquency/').then(r => r.data)

export const exportDisbursements = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/disbursements/export/', { params, responseType: 'blob' }).then(r => r.data)

export const exportCollections = (params?: { start?: string; end?: string }) =>
  backoffice.get('/reports/collections/export/', { params, responseType: 'blob' }).then(r => r.data)

export const exportDelinquency = () =>
  backoffice.get('/reports/delinquency/export/', { responseType: 'blob' }).then(r => r.data)

export default backoffice