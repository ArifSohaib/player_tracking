import argparse 

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--inputFile", type=str, help="the log file to parse")
    parser.add_argument("-o", "--outputFile", type=str, help="the output log file")
    args = parser.parse_args()
    if(args.inputFile == None):
        inputFile = "position.log"
    else:
        inputFile = args.inputFile
    if(args.outputFile == None):
        outFile = "parsed_loc.txt"
    else:
        outFile = args.outputFile
    
    out = open(outFile,"w")
    with open(inputFile) as f:
        for line in f.readlines():
            if("location data: position:" in line):
                parts = line.split(" ")
                #print(parts)
                timestamp = parts[0][:len(parts[0])-1]
                time_str = '"Time":"{}", '.format(timestamp)
                loc_str = '"Sensor":"{}", location": "X":"{}", "Y":"{}", "Z":"{}"'.format(parts[1][-4:], parts[5][2:], parts[6][2:], parts[7][2:])
                print(time_str)
                print(loc_str)
                out.write(time_str+ loc_str+"\n")
if __name__ == "__main__":
    main();