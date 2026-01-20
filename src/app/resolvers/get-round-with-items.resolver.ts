import { ResolveFn } from '@angular/router';
import { GetRoundWithItemsDto } from '../models/get-round-with-items.dto';
import { RouteParams } from '../shared/route-params';
import { inject } from '@angular/core';
import { RoundService } from '../services/round.service';

export function getRoundWithItemsResolver(
  roundIdParamName = RouteParams.RoundId,
): ResolveFn<GetRoundWithItemsDto> {
  return (route) => {
    const roundService = inject(RoundService);
    const roundId = route.params[roundIdParamName];
    return roundService.getRoundWithItems(roundId);
  };
}
