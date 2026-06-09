import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";
import { BookingsService } from "src/apis/bookings/bookings.service";

@Injectable()
export class QueueCleanUpService {
    constructor(
        @InjectQueue('bulk-add-product') private readonly queue: Queue,
        private bookingService:BookingsService) { }

    @Cron('0 12 * * *',{name: 'queue-cleanup-job',})
    async handleQueueCleanUp() {
        const ONE_DAY = 86400000;
        console.log('running queue Cleanup');
        await this.queue.clean(ONE_DAY, 'completed');
        await this.queue.clean(ONE_DAY, 'failed');

        console.log('Queue cleaned (last 24 hours)');
    }

    @Cron('0 12 * * *',{name:'payment-not-received-job'})
    async failedMarkForBookedButNotPaid(){
        await this.bookingService.failedMarkForBookedButNotPaid();
    }
}