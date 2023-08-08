const fs = require('fs')

const fileName = "smol_bolt_00.atlas"

const path = "./files/" + fileName

const current_size = 512
const upscaled_size = 1024

const ratio = upscaled_size / current_size

fs.readFile(path, 'utf-8', (err, data) => {
    let line = 0
    let finalString = ""
    data.split('\n').forEach(line => {
        if (line != 0 && !line.includes("scale") && !line.includes("rotate")) {
            if (line.includes(':')){
                let templine = line.split(':')[0]
                let numberArray = line.split(':')[1]

                let numberArrayTrulyArray = numberArray.split(',')
                const ratioedArray = []
                numberArrayTrulyArray.forEach(number => {
                    if (!isNaN(number)) {
                        ratioedArray.push(parseInt(number) * ratio)
                    } else {
                        ratioedArray.push(number)
                    }
                })
                numberArray = ratioedArray.join(',')
                finalString += (templine + ':' + numberArray + "\n")
            } else {
                finalString += line + "\n"
            }
        } else {
            finalString += line + "\n"
        }
        line++
    });
    fs.writeFile("output/"+fileName, finalString, (err) => {
        if (err) console.log(err)
    })
})