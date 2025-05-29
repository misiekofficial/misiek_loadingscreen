exports.deferralmanager:RegisterHook(1, function(source, deferrals)
	local player = source

	deferrals.handover({
		name = GetPlayerName(player),
	})
end)

-- https://discord.gg/P8KKAb7D4q
-- UI Projects for FiveM by totenmajkel_ (misiek_dev)