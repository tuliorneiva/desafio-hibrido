import cron from 'node-cron'
import { CartService } from '../cart/services/cart.service'


export function startSyncScheduler(): void {
    const CRON_EXPRESSION = process.env.CRON_EXPRESSION ?? '0 0 * * *'
    cron.schedule(CRON_EXPRESSION, async () => {
    console.log('[Scheduler] Iniciando sincronização de carrinhos...')
    try {
      await CartService.sync()
      console.log('[Scheduler] Carrinhos sincronizados com sucesso')
    } catch (err) {
      console.error('[Scheduler] Erro ao sincronizar carrinhos:', err)
    }
  })

  console.log(`[Scheduler] Agendado com expressão: "${CRON_EXPRESSION}"`)
}
