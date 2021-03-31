import { BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/PunkBodies/PunkBodies"
import { TokenOwnerEntity } from "../generated/schema"

function updateOwner(token_type: string, token_id: BigInt, token_owner: string): void {
  let id = token_type + '@' + token_id.toHex()
  let entity = TokenOwnerEntity.load(id)
  if (entity === null) {
    entity = new TokenOwnerEntity(id)
    entity.token_type = token_type
    entity.token_id = token_id
  }
  entity.token_owner = token_owner
  entity.save()
}

export function handlePunkBodiesTransfer(event: Transfer): void {
  updateOwner('punkbodies', event.params.tokenId, event.params.to.toHex())
}

export function handlePunksterTransfer(event: Transfer): void {
  updateOwner('punkster', event.params.tokenId, event.params.to.toHex())
}
