import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--inputFile", type=str, help="input file to perform gap analysis on")
    parser.add_argument("-o", "--outputFile", type=str, help="output file for the results")
    parser.add_argument("-m", "--maxGap", type=float, help="maximum gap to check")
    prev = 0
    big_diff = 0
    args = parser.parse_args()
    if(args.outputFile == None):
        outputFile = "gap_analysis.txt"
    else:
        outputFile = args.outputFile 
    out = open(outputFile, "w")
    if (args.inputFile == None):
        inputFile = "parsed_loc121318.txt"
    else:
        inputFile = args.inputFile
    with open(inputFile) as f:
        for line in f.readlines():
            curr = float(line.split(" ")[0].split(":")[1][1:-2])
            diff = curr - prev
            
            print("diff:{}".format(diff))
            if(diff > 1):
                print("big diff")
                out.write("prev={}, curr={}, gap={}\n".format(curr,prev, diff))
                big_diff += 1
            prev = curr
        print("big gaps: {}".format(big_diff))
    out.close()
if __name__ == "__main__":
    main()