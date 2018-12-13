import json
import argparse 

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--inputFile", type=str, help="input file to perform gap analysis on")
    parser.add_argument("-o", "--outputFile", type=str, help="output file for the results")

    args = parser.parse_args()
    if(args.outputFile == None):
        outFile = "parsed_loc.json"
    else:
        outFile = args.outputFile
    if(args.inputFile == None):
        inFile = "position.log"
    else:
        inFile = args.inputFile

    data = []

    with open(inFile) as f:
        for line in f.readlines():
            if("location data: position:" in line):
                parts = line.split(" ")
                
                timestamp = parts[0][:len(parts[0])-1]
                time_str = '"Time":"{}", '.format(timestamp)
                loc_str = '"Sensor":"{}", location": "X":"{}", "Y":"{}", "Z":"{}"'.format(parts[1][-4:], parts[5][2:], parts[6][2:], parts[7][2:])
                data.append({
                    "Time":float(timestamp),
                    "Sensor":parts[1][-4:],
                    "x":float(parts[5][2:]),
                    "y":float(parts[6][2:]),
                    "z":float(parts[7][2:])
                    })
                print(time_str)
                print(loc_str)
    with open(outFile,"w") as f:
        json.dump(data, f)

if __name__ == "__main__":
    main()