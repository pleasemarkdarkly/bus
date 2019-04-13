import { ContainerModule } from 'inversify'
import { BUS_SQS_INTERNAL_SYMBOLS, BUS_SQS_SYMBOLS } from './bus-sqs-symbols'
import { bindLogger } from '@node-ts/logger-core'
import { BUS_SYMBOLS, Transport } from '@node-ts/bus-core'
import { SqsTransport } from './sqs-transport'
import { SQS, SNS } from 'aws-sdk'

export class BusSqsModule extends ContainerModule {
  constructor () {
    super (async (bind, _, __, rebind) => {
      bind(BUS_SQS_INTERNAL_SYMBOLS.SqsTransport)
        .to(SqsTransport)
        .inSingletonScope()
      bindLogger(bind, SqsTransport)

      rebind<Transport<SQS.Message>>(BUS_SYMBOLS.Transport)
        .to(SqsTransport)
        .inSingletonScope()

      bind(BUS_SQS_INTERNAL_SYMBOLS.Sqs)
        .toConstantValue(new SQS())

      bind(BUS_SQS_INTERNAL_SYMBOLS.Sns)
        .toConstantValue(new SNS())

    })
  }
}
