local handoverData = {}

exports("GetHandoverData", function()
    return handoverData
end)

RegisterNUICallback("handover", function(data, cb)
    handoverData = data
    TriggerEvent("data:handover", data)

    while GetIsLoadingScreenActive() do
        Wait(100)
    end

    ShutdownLoadingScreenNui()
    TriggerEvent("server:loadingScreenClose")

    cb("ok")
end)

SendLoadingScreenMessage(json.encode({
    handover = true
}))

-- https://discord.gg/P8KKAb7D4q
-- UI Projects for FiveM by totenmajkel_ (misiek_dev)