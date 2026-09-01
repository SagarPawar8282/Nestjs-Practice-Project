import { Injectable } from "@nestjs/common";
import { Counter, Gauge, Histogram, Registry } from "prom-client";

@Injectable()
export class MetricsService {

    private readonly registry: Registry;

    public readonly redisProducerRuns: Counter<string>;

    public readonly redisProducerFailure: Counter<string>;

    public readonly redisProducerDuration: Histogram<string>;

    public readonly redisProducerRecordsProcessed: Counter<string>;

    public readonly redisProducerLastSuccessTimestamp: Gauge<string>;

    public readonly redisProducerError: Counter<string>;

    public readonly httpRequestsTotal: Counter<string>;

    public readonly httpRequestDuration: Histogram<string>;

    public readonly queueJob:Counter<string>;

    constructor() {
        this.registry = new Registry();         //Registry is container that holds our metrics.

        this.redisProducerRuns = new Counter({
            name: 'redis_producer_runs_total',
            help: 'Total number of Redis producer cron executions',
            registers: [this.registry],
        });

        this.redisProducerFailure = new Counter({
            name: 'redis_producer_failed_total',
            help: 'Total number failure occure during Redis producer cron executions',
            registers: [this.registry]
        });

        this.redisProducerDuration = new Histogram({
            name: 'redis_producer_duration_seconds',
            help: 'Duration of Redis producer cron execution in seconds',
            registers: [this.registry]
        });

        this.redisProducerRecordsProcessed = new Counter({
            name: 'redis_producer_records_processed_total',
            help: 'Total number of records processed by Redis producer',
            labelNames:['service'],
            registers: [this.registry]
        });

        this.redisProducerLastSuccessTimestamp = new Gauge({
            name: 'redis_producer_last_success_timestamp',
            help: 'Unix timestamp of the last successful Redis producer execution',
            registers: [this.registry],
        });

        this.redisProducerError = new Counter({
            name: 'redis_producer_error_total',
            help: 'Total number of Redis producer errors by operation',
            labelNames: ['operation'],
            registers: [this.registry]
        });

        this.httpRequestsTotal = new Counter({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'route', 'status_code'],
            registers: [this.registry],
        });

        this.httpRequestDuration = new Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
            registers: [this.registry],
        });

        this.queueJob=new Counter({
            name:'queue_job_added_total',
            help:'number of jobs added in the queue',
            labelNames:['jobName',],
            registers:[this.registry],
        })
    }

    async getMetrics(): Promise<string> {
        return this.registry.metrics();
    }

    getContentType(): string {
        return this.registry.contentType;
    }
}